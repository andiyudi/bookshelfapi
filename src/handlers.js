const { nanoid } = require('nanoid');
const { successResponse, failResponse, errorResponse } = require('./response');

const books = [];

const addBookHandler = (request, h) => {
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;

    // Validation: Name is required
    if (!name) {
        return h.response(failResponse('Gagal menambahkan buku. Mohon isi nama buku')).code(400);
    }

    // Validation: readPage shouldn't exceed pageCount
    if (readPage > pageCount) {
        return h.response(failResponse('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount')).code(400);
    }

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if (isSuccess) {
        return h.response(successResponse({
            message: 'Buku berhasil ditambahkan',
            data: { bookId: id },
        })).code(201);
    }

    return h.response(errorResponse('Buku gagal ditambahkan')).code(500);
};

const getAllBooksHandler = (request, h) => {
    const { name, reading, finished } = request.query;

    let filteredBooks = [...books];

    // Filter by name (case insensitive)
    if (name) {
        filteredBooks = filteredBooks.filter(
            (book) => book.name.toLowerCase().includes(name.toLowerCase()),
        );
    }

    // Filter by reading status
    if (reading !== undefined) {
        const isReading = reading === '1';
        filteredBooks = filteredBooks.filter((book) => book.reading === isReading);
    }

    // Filter by finished status
    if (finished !== undefined) {
        const isFinished = finished === '1';
        filteredBooks = filteredBooks.filter((book) => book.finished === isFinished);
    }

    const simplifiedBooks = filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
    }));

    return h.response(successResponse({
        data: { books: simplifiedBooks },
    }));
};

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books.find((b) => b.id === bookId);

    if (!book) {
        return h.response(failResponse('Buku tidak ditemukan')).code(404);
    }

    return h.response(successResponse({
        data: { book },
    }));
};

const editBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;
    const updatedAt = new Date().toISOString();

    // Validation: Name is required
    if (!name) {
        return h.response(failResponse('Gagal memperbarui buku. Mohon isi nama buku')).code(400);
    }

    // Validation: readPage shouldn't exceed pageCount
    if (readPage > pageCount) {
        return h.response(failResponse('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount')).code(400);
    }

    const index = books.findIndex((book) => book.id === bookId);
    if (index === -1) {
        return h.response(failResponse('Gagal memperbarui buku. Id tidak ditemukan')).code(404);
    }

    const finished = pageCount === readPage;

    books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        updatedAt,
    };

    return h.response(successResponse({
        message: 'Buku berhasil diperbarui',
    }));
};

const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex((book) => book.id === bookId);

    if (index === -1) {
        return h.response(failResponse('Buku gagal dihapus. Id tidak ditemukan')).code(404);
    }

    books.splice(index, 1);
    return h.response(successResponse({
        message: 'Buku berhasil dihapus',
    }));
};

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler,
};
