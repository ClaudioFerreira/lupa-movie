import React, { useState } from 'react'
import './style.css'
import EmptyImage from '../../shared/assets/img/empty-list.png'

import { Movie } from '../../shared/models/movie.model'
import api from '../../shared/services/api'

export default function Main() {

    const [title, setTitle] = useState('')
    const [filme, setFilme] = useState(true)
    const [itens, setItens] = useState<Movie[]>([])

    function handleSelect() {
        setFilme(!filme)
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        await api.get(``, {
            params: {
                type: filme ? 'movie' : 'series',
                t: title
            }
        })
            .then(response => {
                console.log(response.data)
                setItens([response.data])
                console.log(itens.length)
                console.log(itens)
            })
    }

    return (
        <>
            <div className="seach-bar">
                <div className="container">
                    <form onSubmit={e => handleSubmit(e)}>
                        <input
                            type="text"
                            placeholder="Buscar"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <input
                            type="radio"
                            name="type"
                            id="filme"
                            checked={filme}
                            onChange={handleSelect}
                        />
                        <label htmlFor="filme">Filmes</label>
                        <input
                            type="radio"
                            name="type"
                            id="serie"
                            checked={!filme}
                            onChange={handleSelect}
                        />
                        <label htmlFor="serie">Series</label>
                        <button type="submit">
                            Buscar
                    </button>
                    </form>
                </div>
            </div>

            <div className="container">
                {itens.length > 0 ? (
                    <div className="list-items">
                        {itens.map(item => (
                            <div className="card">
                                <img src={item.Poster} alt={`${item.Title} - Poster`} />
                                <h2> {item.Title} </h2>
                                <h3>Ano: {item.Year} | Diretor: {item.Director}</h3>
                                <p>Genero: {item.Genre}</p>
                                <a href="http://">detalhes</a>
                            </div>
                        ))}
                    </div>
                ) : (
                        <div className="empty-list">
                            <img src={EmptyImage} alt="empty list" />
                        </div>
                    )}
            </div>
        </>
    )
}