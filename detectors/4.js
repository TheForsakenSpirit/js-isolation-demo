const potentialLeads = getLeads() ?? [];

//emulate math heavy operation
function fibonacci(length) {
    let sequence = [1, 1];
    for (let i = 2; i < length; i++) {
        sequence[i] = sequence[i - 1] + sequence[i - 2];
    }
    return sequence;
}

const isSupportedType = (type)=>{
    return /SUV|Sedan|Truck|Van/gm.test(type);
}

const isSupportedMake = (make) => {
    return /Toyota|Honda|Nissan|Mazda|Subaru/gm.test(make);
}


const results = potentialLeads.map((lead) => {
    fibonacci(10000);
    if(!isSupportedMake(lead?.make ?? "")){
        return false;
    }

    if(!isSupportedType(lead?.type ?? "")){
        return false;
    }

    return true;
});

setResult(results);
