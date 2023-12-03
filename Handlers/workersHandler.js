import { workers } from "../Models/workersModel.js";

function getWorkers() {
    return workers;
}

function getWorker(id) {
    return workers.find(x => x.id == id);
}
function addWorker(newWorker) {
    workers.push(newWorker);
    return;
}

export const workersMethods = {
    getWorkers,
    getWorker,
    addWorker
}
