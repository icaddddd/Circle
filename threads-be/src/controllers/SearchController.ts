import { Request, Response } from "express";
import SearchService from "../services/SearchService";

class SearchController {
  findAll(req: Request, res: Response) {
    SearchService.findAll(req, res);
  }
}
export default new SearchController();
