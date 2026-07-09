import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import './Admin.css';

export default function Admin() {

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        return <Navigate to="/login" />;
    }

    const [items, setItems] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const [editingId, setEditingId] = useState(null);
    async function loadItems() {

        const response = await fetch(
            "https://excursieapp-production.up.railway.app//api/bezienswaardigheden"
        );
        const data = await response.json();
        setItems(data);
    }

    useEffect(() => {
        loadItems();
    }, []);

    async function save(e) {
        e.preventDefault();
        const body = {
            title,
            description,
            image,
            location,
            user_id: user.id
        };

        if (editingId === null) {
            await fetch(
                "https://excursieapp-production.up.railway.app//api/bezienswaardigheden",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );
        } else {
            await fetch(
                `https://excursieapp-production.up.railway.app//api/bezienswaardigheden/${editingId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );
        }

        setTitle("");
        setDescription("");
        setLocation("");
        setImage("");
        setEditingId(null);
        loadItems();
    }

    async function remove(id) {
        if (!window.confirm("Weet je het zeker?")) return;

        await fetch(
            `https://excursieapp-production.up.railway.app//api/bezienswaardigheden/${id}`,
            {
                method: "DELETE"
            }
        );
        loadItems();
    }

    function edit(item) {
        setEditingId(item.id);
        setTitle(item.title);
        setDescription(item.description);
        setLocation(item.location);
        setImage(item.image);
    }

    function logout() {
        localStorage.removeItem("user");
        window.location.href = "/";
    }

    return (
        <div className="admin">
            <h1>CMS</h1>

            <p>Welkom {user.name}</p>

            <button onClick={logout}> Uitloggen </button>

            <hr/>

            <h2> {editingId ? "Bezienswaardigheid wijzigen" : "Nieuwe bezienswaardigheid"} </h2>

            <form onSubmit={save}> <input placeholder="Titel" value={title} onChange={(e) => setTitle(e.target.value)}/>
            
                <br/><br/>

                <textarea placeholder="Beschrijving" value={description} onChange={(e) => setDescription(e.target.value)} />
                
                <br/><br/>

                <input placeholder="Locatie" value={location} onChange={(e) => setLocation(e.target.value)} />

                <br/><br/>

                <input placeholder="Afbeelding URL" value={image} onChange={(e) => setImage(e.target.value)} />

                <br/><br/>

                <button>{editingId ? "Opslaan" : "Toevoegen"}</button>
            </form>

            <hr/>

            <h2>Overzicht</h2>

            {
                items.map(item => (
                    <div
                        key={item.id}
                        style={{
                            border: "1px solid gray",
                            padding: 15,
                            marginBottom: 15
                        }}
                    >

                        <h3>{item.title}</h3>

                        <p>{item.description}</p>

                        <p>
                            <strong>Locatie:</strong>
                            {" "}
                            {item.location}
                        </p>

                        <p> <strong>Aangepast door:</strong> {" "} {item.name} </p>

                        <button onClick={() => edit(item)}> Bewerken </button>

                        {" "}

                        <button onClick={() => remove(item.id)}> Verwijderen </button>
                    </div>
                ))
            }
        </div>
    );
}