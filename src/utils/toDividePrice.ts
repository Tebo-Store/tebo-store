export const toDividePrice = (price: number, locale: string = 'ru') => {
    return price.toLocaleString(locale)
}