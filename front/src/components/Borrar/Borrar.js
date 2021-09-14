import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import futbol from '../../assets/image/futbol.jpg'

export const Borrar = () => {

    const historia = useHistory()

    const { id } = useParams()
    const [news, setnews] = useState({})

    useEffect(async () => {
        const res = await fetch(`http://localhost:3001/api/noticias/buscar/${id}`)
        const data = await res.json()
        setnews(data)
    }, [])

    const handleClik = (e) => {
        console.log("borrando")
        let result = window.confirm("estas por borrar un dato definitivamente")
        if (result == true) {
            const res = axios.delete(`http://localhost:3001/api/noticias/borrar/${id}`)
                .then(res => console.log(res));
        }
        historia.push("/noticias/administracion")

    }

    console.log(news)
    return (
        <div>
            <h1> borrar noticia</h1>
            <div className="container">
                <div className="card" >
                    <img src={futbol} className="card-img-top" alt="..." />
                    <div className="card-footer bg-secondary border-success">Deportes</div>
                    <div className="card-body">
                        <p className="card-text">{news.bajada}</p>
                        <button className="btn btn-primary "
                            onClick={handleClik}>borrar</button>


                    </div>
                </div>
            </div>

        </div>
    )
}
