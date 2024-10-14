import v from ".";

const obj_schema = v.object({
  name: v.string(),
});

obj_schema.parse({ name: "Sahil" });
