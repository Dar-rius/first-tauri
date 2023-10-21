'use client'
import {invoke} from "@tauri-apps/api/tauri"
import React, {useRef} from "react";

export default function Create(){
    const nom = useRef("")
    const prenom = useRef("")
    const email = useRef("")
    const createData = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        await invoke("insert_data",
            {nom: nom.current,
            prenom: prenom.current,
            email: email.current})
            .then(console.log)
            .catch(console.error)
    }
    return<>
        <h1>Create new infos</h1>
        <form onSubmit={createData}>
            <label>Nom</label>
            <input name="nom" onChange={e => (nom.current = e.target.value)}/>
            <label>Prenom</label>
            <input name="prenom" onChange={e => (prenom.current = e.target.value)}/>
            <label>Email</label>
            <input name="email" type="email" onChange={e => (email.current = e.target.value)}/>
            <input type="submit" value="Enregistrer"/>
        </form>
    </>
}