// * ##### NODES #####
export function createNode(id, location, label, color) {
    fetch(`http://localhost:3000/api/node/create?id=${id}&location=${location}&label=${label}&color=${color}`);
    }

export function updateNode(id, location, label, color, tasks) {
    fetch(`http://localhost:3000/api/node/update?id=${id}&location=${location}&label=${label}&color=${color}`);
}

export function deleteNode(id) {
    fetch(`http://localhost:3000/api/node/delete?id=${id}`);
}

// * ##### AXONS #####
export function createAxon(id, from, to) {
    fetch(`http://localhost:3000/api/axon/create?id=${id}&from=${from}&to=${to}`);
}

export function updateAxon(id, from, to) {
    fetch(`http://localhost:3000/api/axon/update?id=${id}&from=${from}&to=${to}`);
}

export function deleteAxon(id) {
    fetch(`http://localhost:3000/api/axon/delete?id=${id}`); 
}

// * ##### ENTRIES #####

// * ##### TASKS #####
export async function updateTaskData(id) {
    const req = await fetch(`http://localhost:3000/api/tasks?id=${id}`, {
        method: "GET"
    })
    return await req.json();
}

export function updateTaskList(id, tasks) {
    fetch("http://localhost:3000/api/tasks", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            tasks: tasks,
        })
    });
}