const potentialLeads = getLeads() ?? [];
const supportedMake = ['Toyota', 'Honda', 'Nissan', 'Mazda', 'Subaru'];
const supportedProblemCategory = ['Engine', 'Transmission', 'Suspension', 'Brakes', 'Electrical'];
const bannedEngine = ["electric"];


const results = potentialLeads.map((lead) => {
    if(!supportedMake.includes(lead?.make)){
        return false;
    }

    if(!supportedProblemCategory.includes(lead?.problemCategory)){
        return false;
    }

    if(bannedEngine.includes(lead?.fuel)){
        return false;
    }

    return true;
});

setResult(results);
