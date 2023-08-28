import { Entity } from "typeorm";

import { BaseEntity } from "src/common/entities/base.entity";
import { IExample } from "../interfaces/example.interface";

// @Entity({ name: 'example' })
export class ExampleEntity extends BaseEntity implements IExample { }
