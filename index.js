import ivm from 'isolated-vm';
import { createRandomVehicles, getDetectors } from './generateTestData.js';
import { performance, PerformanceObserver } from "node:perf_hooks";

const LEAD_AMOUNT = 10000;

const leads = createRandomVehicles(LEAD_AMOUNT);
const scripts = getDetectors();


const isolatePool = scripts.map(() => new ivm.Isolate({ 
    inspector:false,
    //mb
    memoryLimit: 64,
    onCatastrophicError: (err) => {
        console.log('Catastrophic Error: %s', err);
    },
}));


const processLeads = async (lead, scripts) => {
    const promises = isolatePool.map(async (_, i) => {
        const isolate = isolatePool[i];
        const script = scripts[i];

        performance.mark(`virtual_run_start_${i}`);
        const context = await isolate.createContext({
            inspector:false,
        });

        const jail = context.global;
        await jail.set('global', jail.derefInto({}));
        await jail.set('log', function(...args) {
            console.log("log called");
            console.log(...args);
        });

        // const derefInfo = jail.derefInto(lead);
        await jail.set("getLeads", function(){
            return [lead];
        });

        await jail.set("setResult", function(result){
            // console.log("Result: %s", JSON.stringify(result));
        });

        const compiled = await isolate.compileScript(script);

        await compiled.run(context).catch((err)=>{
            console.log('Error: %s', err ?? "Unknown error");
        });

        // await context.eval(script).catch((err)=>{
        //     console.log('Error: %s', err ?? "Unknown error");
        // });

        compiled.release();
        context.release();


        performance.mark(`virtual_run_end_${i}`);
        performance.measure(`virtual_run_${i}`, `virtual_run_start_${i}`, `virtual_run_end_${i}`);
    });

    await Promise.all(promises);
};

const dataCollection = {};

for(let i = 0; i < scripts.length; i++){
    dataCollection[`virtual_run_${i}`] = [];
}
dataCollection['run'] = [0];
dataCollection['v_run'] = [];

const obs = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        if(entry.name === 'run'){
            console.log(`Total run time: ${entry.duration} milliseconds`);
        }
        dataCollection[entry.name].push(entry.duration);
    });
});

obs.observe({ entryTypes: ['measure'] });

performance.mark('run_start');

for(let d = 0; d < leads.length; d++){
    const lead = leads[d];
    console.log("Processing lead %d of %d", d, leads.length);
    performance.mark('v_start');
    // for(let i = 0; i < scripts.length; i++){
    //     const script = scripts[i];
    //     performance.mark(`virtual_run_start_${i}`);
        await processLeads(lead, scripts);
    //     performance.mark(`virtual_run_end_${i}`);
    //     performance.measure(`virtual_run_${i}`, `virtual_run_start_${i}`, `virtual_run_end_${i}`);
    // }
    performance.mark('v_end');
    performance.measure('v_run', 'v_start', 'v_end');
}



performance.mark('run_end');
performance.measure('run', 'run_start', 'run_end');
performance.clearMarks();


Object.entries(dataCollection).map(([n, values])=> {
 const average = values.reduce((a, b) => a + b, 0) / values.length;
 console.log(`Average for ${n}: ${average} milliseconds`);
});


const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`;

const memoryData = process.memoryUsage();

const memoryUsage = {
  rss: `${formatMemoryUsage(memoryData.rss)} -> Resident Set Size - total memory allocated for the process execution`,
  heapTotal: `${formatMemoryUsage(memoryData.heapTotal)} -> total size of the allocated heap`,
  heapUsed: `${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during the execution`,
  external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
};

console.log(memoryUsage);
