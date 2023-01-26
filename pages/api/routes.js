export async function createNode(id, location, label, color) {
        await fetch(`http://localhost:3000/api/node/create?id=${id}&location=${location}&label=${label}&color=${color}`);
    }

export async function updateNode(id, location, label, color) {
    await fetch(`http://localhost:3000/api/node/update?id=${id}&location=${location}&label=${label}&color=${color}`);
}

export async function deleteNode(id) {
    await fetch(`http://localhost:3000/api/node/delete?id=${id}`);
}
    // Axons
export async function createAxon(id, from, to) {
    await fetch(`http://localhost:3000/api/axon/create?id=${id}&from=${from}&to=${to}`);
}

export async function updateAxon(id, from, to) {
    await fetch(`http://localhost:3000/api/axon/update?id=${id}&from=${from}&to=${to}`);
}

export async function deleteAxon(id) {
    await fetch(`http://localhost:3000/api/axon/delete?id=${id}`); 
}