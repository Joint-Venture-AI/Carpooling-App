import { model, Schema } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import { TChildren } from "./children.interface";
const childrenSchema = new Schema<TChildren>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "First name must be at least 2 characters long"],
      maxlength: [50, "First name can't be more than 50 characters"],
      match: [
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1'-\s]+$/,
        "First name contains invalid characters",
      ],
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Last name must be at least 2 characters long"],
      maxlength: [50, "Last name can't be more than 50 characters"],
      match: [
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1'-\s]+$/,
        "Last name contains invalid characters",
      ],
    },
    schoolName: {
      type: String,
      required: [
        function () {
          return this.tag === "children";
        },
        "School name is required for children",
      ],
      trim: true,
      minlength: [2, "School name must be at least 2 characters long"],
      maxlength: [50, "School name can't be more than 50 characters"],
    },
    image: {
      type: String,
      required: true,
      trim: true,
      default: null,
    },
    tag: {
      type: String,
      enum: ["children", "spouse"],
      default: "children",
    },

  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        // Remove the auto-generated id property
        delete ret.id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
    versionKey: false,
  }
);

// this for text search in names
childrenSchema.index({ firstName: "text", lastName: "text" });
childrenSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Plugin to include virtuals in lean queries.
childrenSchema.plugin(mongooseLeanVirtuals);

export const Children = model<TChildren>("Children", childrenSchema);
