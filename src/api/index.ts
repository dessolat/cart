import { DATA } from "../data"
import { IProduct } from "../types"
import { pause } from "../utils"

export async function getAllProducts(): Promise<IProduct[]> {
	return await pause(DATA)
}

export async function getByIds(arr: number[]): Promise<IProduct[]> {
	const filteredData = DATA.filter(item => arr.includes(item.id))

	return await pause(filteredData)
}