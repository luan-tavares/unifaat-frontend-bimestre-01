export function sleep(seconds) {
    const ms = Number(seconds) * 1000

    if (Number.isNaN(ms) || ms < 0) {
        throw new Error('sleep requer um valor numérico de segundos maior ou igual a zero.')
    }

    return new Promise((resolve) => setTimeout(resolve, ms))
}
