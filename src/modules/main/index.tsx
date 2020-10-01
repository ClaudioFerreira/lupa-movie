import React, { useState } from 'react'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import EmptyImage from '../../shared/assets/img/empty-list.png'

import { Movie } from '../../shared/models/movie.model'
import api from '../../shared/services/api'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Container from 'react-bootstrap/Container'

export default function Main() {

    const [title, setTitle] = useState('')
    const [filme, setFilme] = useState(true)
    const [itens, setItens] = useState<Movie[]>([])
    const [modalDetail, setModalDetail] = useState<Movie>()

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    async function handleShow(imdbID: string) {

        await api.get(``, {
            params: {
                type: filme ? 'movie' : 'series',
                i: imdbID
            }
        })
            .then(response => {
                console.log(response.data)
                setModalDetail(response.data)
                console.log(modalDetail)
                setShow(true)
            })
    }

    function handleSelect() {
        setFilme(!filme)
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (title !== '')
            await api.get(``, {
                params: {
                    type: filme ? 'movie' : 'series',
                    s: title
                }
            })
                .then(response => {
                    setItens(response.data.Search)
                })
    }

    return (
        <>
            <div className="seach-bar">
                <Container>
                    <form onSubmit={e => handleSubmit(e)}>
                        <input
                            type="text"
                            placeholder="Ex: Dracula"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />

                        <ButtonGroup toggle>
                            <ToggleButton
                                type="radio"
                                variant="outline-light"
                                name="Movie"
                                value="Movie"
                                checked={filme}
                                onChange={handleSelect}
                            >
                                Movie
                            </ToggleButton>
                            <ToggleButton
                                type="radio"
                                variant="outline-light"
                                name="Movie"
                                value="Movie"
                                checked={!filme}
                                onChange={handleSelect}
                            >
                                Series
                            </ToggleButton>
                        </ButtonGroup>

                        <Button
                            type="submit"
                            variant="outline-light"
                            className={title === '' ? 'disabled' : ''}
                        >
                            Search
                            </Button>
                    </form>
                </Container>
            </div>

            <Container>
                {itens.length > 0 ? (
                    <div className="list-items">
                        {itens.map(item => (
                            <div className="card" key={item.imdbID}>
                                {
                                    item?.Poster !== 'N/A' ? (
                                        <img src={item?.Poster} alt={`poster - ${item?.Title}`} />
                                    ) : (
                                            <div className="empty-list">
                                                <img src={EmptyImage} alt="empty list" />
                                            </div>
                                        )
                                }
                                <br />
                                <h4> {item.Title} </h4>
                                <h5>Year: {item.Year} </h5>
                                <Button
                                    variant="outline-dark"
                                    onClick={_ => handleShow(item.imdbID)}
                                    block
                                >
                                    Detail
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                        <div className="empty-list">
                            <img src={EmptyImage} alt="empty list" />
                        </div>
                    )}
            </Container>

            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title> {modalDetail?.Title} | {modalDetail?.Year}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        {console.log(modalDetail)}
                        <div className="col">
                            {
                                modalDetail?.Poster !== 'N/A' ? (
                                    <img src={modalDetail?.Poster} alt={`poster - ${modalDetail?.Title}`} />
                                ) : (
                                        <div className="empty-list">
                                            <img src={EmptyImage} alt="empty list" />
                                        </div>
                                    )
                            }
                        </div>
                        <div className="col">
                            <p>Director: {modalDetail?.Director}</p>
                            <p>Genre: {modalDetail?.Genre}</p>
                            <p>Plot: {modalDetail?.Plot}</p>
                            <p>Actors: {modalDetail?.Actors}</p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    )
}