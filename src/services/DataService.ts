import carsData from '../assets/data'
import { carsState } from '../model/StatesModel'
export class DataService {
  private formatData = (items: any) => {
    let tempItems = items.map((item: any) => {
      let id = item.sys.id
      let images = item.fields.images.map((image: any) => image.fields.file.url)
      let car = { ...item.fields, images, id }
      return car
    })
    return tempItems
  }
  public async getData(): Promise<carsState | undefined> {
    const cars = this.formatData(carsData)
    const featuredCars = cars.filter((car: any) => car.featured === true)
    const maxPrice = Math.max(...cars.map((car: any) => car.price))
    const maxSize = Math.max(...cars.map((car: any) => car.size))
    const data = {
      cars,
      featuredCars,
      price: maxPrice,
      maxPrice,
      maxSize,
      type: 'all',
      carMake: 'all',
      minPrice: 0,
      minSize: 0,
      gps: false,
      sportPackage: false,
    }
    return data
  }
}
