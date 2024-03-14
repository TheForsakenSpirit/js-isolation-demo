const potentialLeads = getLeads() ?? [];

const heavyObjectGeneration = (length) => {
    let t = { 
        alt: "Toyota",
    };

    for (let i = 0; i < length; i++) {
        t = {
            ...t,
            [i]: i
        }
    }
}

const isYearFit = (year) => {
    return year > 2000;
}

const results = potentialLeads.map((lead) => {
    heavyObjectGeneration(1000);

    if(!isYearFit(lead?.year)){
        return false;
    }
    

    return true;
});



setResult(results);
