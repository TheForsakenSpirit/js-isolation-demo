const potentialLeads = getLeads() ?? [];

const isSupportedMake = (make) => {
    return /Toyota|Honda|Nissan|Mazda|Subaru/gm.test(make);
}

const isSupportedType = (type)=>{
    return /SUV|Sedan|Truck|Van/gm.test(type);
}

const results = potentialLeads.map((lead) => {
    if(!isSupportedMake(lead?.make ?? "")){
        return false;
    }

    if(!isSupportedType(lead?.type ?? "")){
        return false;
    }

    return true;
});


setResult(results);
