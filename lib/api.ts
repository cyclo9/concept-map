// * ##### DIAGRAM ####
export function createNode(nodeId: string, location: string, label: string, color: string) {
    fetch('/api/nodes', {
        method: 'POST',
        body: JSON.stringify({
            id: nodeId,
            location: location,
            label: label,
            color: color
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function updateNode(nodeId: string, location: string, label: string, color: string) {
    fetch('/api/nodes', {
        method: 'PUT',
        body: JSON.stringify({
            id: nodeId,
            location: location,
            label: label,
            color: color
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function deleteNode(nodeId: string) {
    fetch('/api/nodes', {
        method: 'DELETE',
        body: JSON.stringify({
            id: nodeId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function createAxon(nodeId: string, from: string, to: string) {
    fetch('/api/axons', {
        method: 'POST',
        body: JSON.stringify({
            id: nodeId,
            from: from,
            to: to
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function updateAxon(nodeId: string, from: string, to: string) {
    fetch('/api/axons', {
        method: 'PUT',
        body: JSON.stringify({
            id: nodeId,
            from: from,
            to: to
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function deleteAxon(nodeId: string) {
    fetch('/api/axons', {
        method: 'DELETE',
        body: JSON.stringify({
            id: nodeId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// * ##### POPUP #####
export function updateTasks(nodeId: string, tasks: string[]) {
    fetch('api/tasks', {
        method: 'PUT',
        body: JSON.stringify({
            id: nodeId,
            tasks: tasks,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

// * ##### DATA #####
export function updateData(nodeId: string, data: string[]) {
    fetch('api/data', {
        method: 'PUT',
        body: JSON.stringify({
            id: nodeId,
            data: data
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
}