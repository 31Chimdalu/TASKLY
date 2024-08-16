"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrganization = void 0;
const organizationservice_1 = require("../services/organizationservice");
const createOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const ownerId = req.user.id;
    const organization = yield organizationservice_1.organizationService.createOrganization(name, ownerId);
    res.status(201).json(organization);
});
exports.createOrganization = createOrganization;
