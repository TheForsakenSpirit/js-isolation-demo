const potentialLeads = getLeads() ?? [];

const isEngineProblem = (problem) => {
    return typeof problem !== "string" ? false : /engine/gm.test(problem.toLowerCase());
}

const results = potentialLeads.map((lead) => {
    return (lead?.problems ?? []).some(isEngineProblem);
});


setResult(results);
