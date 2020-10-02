import React, { useState } from 'react'
import './style.css'
import EmptyImage from '../../shared/assets/img/empty-list.png'

import { Movie } from '../../shared/models/movie.model'
import api from '../../shared/services/api'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Container from 'react-bootstrap/Container'
import Pagination from 'react-bootstrap/Pagination'

export default function Main() {

    const [title, setTitle] = useState('')
    const [movie, setMovie] = useState(true)
    const [itens, setItens] = useState<Movie[]>([])
    const [modalDetail, setModalDetail] = useState<Movie>()

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    const Pages = () => (
        <div className="pagination">
            <Pagination>
                {page > 1 && (<Pagination.First onClick={handleFirstPage} />)}
                {page > 1 && (<Pagination.Prev onClick={handlePrevioustPage} />)}

                <Pagination.Item active >{`${page} of ${totalPages}`}</Pagination.Item>

                {page < totalPages && (<Pagination.Next onClick={handleNextPage} />)}
                {page < totalPages && (<Pagination.Last onClick={handleLastPage} />)}
            </Pagination>
        </div>
    )

    const ModalDetails = () => (
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
    )



    async function handleShowDetail(imdbID: string) {
        await api.get(``, {
            params: {
                type: movie ? 'movie' : 'series',
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
        setMovie(!movie)
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (title !== '') {
            setPage(1)

            await api.get(``, {
                params: {
                    type: movie ? 'movie' : 'series',
                    s: title,
                }
            })
                .then(response => {
                    setTotalPages(Math.ceil(response.data.totalResults / response.data.Search.length))
                    setItens(response.data.Search)
                })
        }
    }

    async function handleNextPage() {
        if (page < totalPages) {
            const currentPage = page + 1
            setPage(currentPage)
            loadItems(currentPage)
        }
    }

    async function handleFirstPage() {
        if (page > 1) {
            setPage(1)
            loadItems(1)
        }
    }


    async function handleLastPage() {
        if (page < totalPages) {
            setPage(totalPages)
            loadItems(totalPages)
        }
    }

    async function handlePrevioustPage() {
        if (page > 1) {
            const currentPage = page - 1
            setPage(currentPage)
            loadItems(currentPage)
        }
    }

    async function loadItems(currentPage: number) {
        await api.get(``, {
            params: {
                type: movie ? 'movie' : 'series',
                s: title,
                page: currentPage,
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
                                checked={movie}
                                onChange={handleSelect}
                            >
                                Movie
                            </ToggleButton>
                            <ToggleButton
                                type="radio"
                                variant="outline-light"
                                name="Movie"
                                value="Movie"
                                checked={!movie}
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

                {totalPages !== 0 &&
                    <Pages />
                }

                {itens.length > 0 ? (
                    <>
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
                                        onClick={_ => handleShowDetail(item.imdbID)}
                                        block
                                    >
                                        Detail
                                </Button>
                                </div>
                            ))}
                        </div>
                        <Pages />
                    </>
                ) : (
                        <div className="empty-list">
                            <img src={EmptyImage} alt="empty list" />
                        </div>
                    )}
            </Container>

            <ModalDetails />

        </>
    )
}