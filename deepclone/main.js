import deepClone from "./utility/deepClone.js";


//some of the example of deepclone

const userProfile = {
    name: "John Doe",
    age: 30,
    address: {
        city: "New York",
        zip: "10001"
    },
    hobbies: ["reading", "swimming"]
};

const clonedProfile = deepClone(userProfile);

console.log(clonedProfile);

const cart = {
    items: [
        { productId: 1, name: "Laptop", price: 1000 },
        { productId: 2, name: "Phone", price: 500 }
    ],
    total: 1500,
    user: {
        name: "Jane Doe",
        email: "jane@example.com"
    }
};

const clonedCart = deepClone(cart);

console.log(clonedCart);

const event = {
    title: "Meeting",
    date: new Date(),
    recurrence: {
        type: "weekly",
        days: ["Monday", "Wednesday"]
    }
};

const clonedEvent = deepClone(event);

console.log(clonedEvent);

const projectTasks = {
    id: 1,
    title: "Project X",
    tasks: [
        {
            id: 2,
            title: "Task 1",
            subtasks: [
                { id: 3, title: "Subtask 1" },
                { id: 4, title: "Subtask 2" }
            ]
        }
    ]
};

const clonedTasks = deepClone(projectTasks);

console.log(clonedTasks);

const post = {
    id: 101,
    content: "Hello World!",
    likes: new Set([1, 2, 3]),
    comments: [
        { userId: 1, text: "Great post!" },
        { userId: 2, text: "Thanks for sharing" }
    ]
};

const clonedPost = deepClone(post);

console.log(clonedPost);

const graph = {
    nodes: [
        { id: 1, value: "Node1" },
        { id: 2, value: "Node2" }
    ],
    edges: [
        { from: 1, to: 2, weight: 5 }
    ]
};

const clonedGraph = deepClone(graph);

console.log(clonedGraph);


const userPreferences = {
    theme: "dark",
    language: "en",
    shortcuts: {
        copy: "Ctrl+C",
        paste: "Ctrl+V"
    },
    notificationSettings: {
        email: true,
        sms: false
    }
};

const clonedPreferences = deepClone(userPreferences);

console.log(clonedPreferences);


const playlist = {
    name: "My Playlist",
    songs: [
        { title: "Song 1", duration: "3:30" },
        { title: "Song 2", duration: "4:00" }
    ],
    duration: "7:30"
};

const clonedPlaylist = deepClone(playlist);

console.log(clonedPlaylist);


const employees = {
    name: "CEO",
    employees: [
        {
            name: "Manager 1",
            employees: [
                { name: "Employee 1" },
                { name: "Employee 2" }
            ]
        },
        {
            name: "Manager 2",
            employees: [
                { name: "Employee 3" },
                { name: "Employee 4" }
            ]
        }
    ]
};

const clonedEmployees = deepClone(employees);

console.log(clonedEmployees);


const gameCharacter = {
    name: "Warrior",
    health: 100,
    inventory: {
        weapons: ["Sword", "Shield"],
        potions: [{ type: "Health", quantity: 3 }]
    }
};

const clonedCharacter = deepClone(gameCharacter);
console.log(gameCharacter);
console.log(clonedCharacter.name = "Wizard");