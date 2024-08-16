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
const organizationmodel_1 = require("../../models/organizationmodel");
describe('Organization Model', () => {
    it('should create a new organization', () => __awaiter(void 0, void 0, void 0, function* () {
        const organization = yield organizationmodel_1.organizationModel.create({ name: 'Test Organization' });
        expect(organization).toHaveProperty('name', 'Test Organization');
    }));
});
