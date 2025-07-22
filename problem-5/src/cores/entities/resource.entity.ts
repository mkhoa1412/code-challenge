import { Prop, ModelOptions } from "@typegoose/typegoose";
import { BaseEntity } from "../base.entity";

@ModelOptions({
  schemaOptions: {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
})
export class ResourceEntity extends BaseEntity {
  @Prop({ required: true })
  public name!: string;
}
