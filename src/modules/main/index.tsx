import React, { useState } from 'react'
import './style.css'

export default function Main() {

    const [search, setSearch] = useState('')
    const [filme, setFilme] = useState(true)

    function handleSelect() {
        setFilme(!filme)
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }

    return (
        <>
            <div className="seach-bar">
                <div className="container">
                    <form onSubmit={e => handleSubmit(e)}>
                        <input
                            type="text"
                            placeholder="Buscar"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
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
        </>
    )
}