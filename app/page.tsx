'use client'
import React, {useEffect, useState} from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Link from "next/link";

export default function Home() {
  let [data, setData] = useState([])

  useEffect(() => {
    invoke<string>("display_data")
        .then(setData)
        .catch(console.error);
  }, []);

  return (
      <>
        <div>
          <h1>Tester Tauri</h1>
          <br/>
          <header>
            <Link href={"/create"}>
              Create
            </Link>
          </header>
          <br/>
          <p>Le but de ce logiciel est que vous enregistrer vos infos personnelle</p>
          <p>Les donnees actuellement stocker:</p>
          <br/>
          {data.map((item) => (
              <div key={item.id}>
                <p>
                  Nom: {item.nom}
                </p>
                <p>
                  Prenom: {item.prenom}
                </p>
                <p>
                  Adresse mail: {item.email}
                </p> <br/>
              </div>
          ))}
        </div>
      </>
  );
}
