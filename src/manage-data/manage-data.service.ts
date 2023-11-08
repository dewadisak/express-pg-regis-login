import { ManageDataRepository } from "./manage-data.repository";

export class ManageDataService {
  public manageDataRepository: ManageDataRepository;
  constructor() {
    this.manageDataRepository = new ManageDataRepository();

  }

  public async getAllData() {
    const result = await this.manageDataRepository.getAllData()
    this.manageDataRepository.closeConnection();
    return result;
  }

}