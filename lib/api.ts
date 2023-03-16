// * ##### DIAGRAM ####
export function createNode(nodeId: string, location: string, label: string, color: string, category: string) {
    fetch('/api/nodes', {
        method: 'POST',
        body: JSON.stringify({
            id: nodeId,
            location: location,
            label: label,
            color: color,
            category: category
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status == 200) {
                console.log('+N', '\n', [
                    `id: ${nodeId}`,
                    `location: ${location}`,
                ])
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
        .then(res => {
            if (res.status == 200) {
                console.log('*N', { label: label }, '\n', [
                    `id: ${nodeId}`,
                    `location: ${location}`,
                    `color: ${color}`
                ])
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
        .then(res => {
            if (res.status == 200) {
                console.log('-N', { id: nodeId })
            }
        })
}

export function createAxon(axonId: string, from: string, to: string) {
    fetch('/api/axons', {
        method: 'POST',
        body: JSON.stringify({
            id: axonId,
            from: from,
            to: to
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status == 200) {
                console.log('+A', '\n', [
                    `id: ${axonId}`,
                    `from: ${from}`,
                    `to: ${to}`
                ])
            }
        })
}

export function updateAxon(axonId: string, from: string, to: string) {
    fetch('/api/axons', {
        method: 'PUT',
        body: JSON.stringify({
            id: axonId,
            from: from,
            to: to
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status == 200) {
                console.log('*A', { id: axonId }, '\n', [
                    `id: ${axonId}`,
                    `from: ${from}`,
                    `to: ${to}`
                ])   
            }
        })
}

export function deleteAxon(axonId: string) {
    fetch('/api/axons', {
        method: 'DELETE',
        body: JSON.stringify({
            id: axonId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status == 200) {
                console.log('-A', { id: axonId }, '\n', [
                    `id: ${axonId}`,
                ])   
            }
        })
}

// * ##### DATA #####
export function createDataList(nodeId: string) {
    fetch('/api/data', {
        method: 'POST',
        body: JSON.stringify({
            id: nodeId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status == 200) {
                console.log('+D', { nodeId: nodeId })   
            }
        })
}

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
        .then(res => {
            if (res.status == 200) {
                console.log('*D', { nodeId: nodeId }, '\n', data[0].children[0].text)
            }
        })
}

export function deleteDataList(nodeId: string) {
    fetch('/api/data', {
        method: 'DELETE',
        body: JSON.stringify({
            id: nodeId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status == 200) {
                console.log('-D', { nodeId: nodeId })   
            }
        })
}

// * ##### TASKS #####
export function createTaskList(nodeId: string) {
    fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({
            id: nodeId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status == 200) {
                console.log('+T', { nodeId: nodeId })
            }
        })
}

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
    })
        .then(res => {
            if (res.status == 200) {
                console.log('*T', { nodeId: nodeId }, '\n', tasks)
            }
        })
}

export function deleteTaskList(nodeId: string) {
    fetch('/api/tasks', {
        method: 'DELETE',
        body: JSON.stringify({
            id: nodeId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status == 200) {
                console.log('-T', { nodeId: nodeId })
            }
        })
}