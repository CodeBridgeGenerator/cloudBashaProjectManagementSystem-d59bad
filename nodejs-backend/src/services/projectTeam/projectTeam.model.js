
    module.exports = function (app) {
        const modelName = "project_team";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            projectName: { type: Schema.Types.ObjectId, ref: "projects", comment: "Project Name, dropdown, false, true, true, true, true, true, true, projects, projects, one-to-one, projectName," },
teamMember: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Team Member, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
role: { type:  String , comment: "Role, p, false, true, true, true, true, true, true, , , , ," },
allocation: { type: Number, comment: "Allocation, p_number, false, true, true, true, true, true, true, , , , ," },
startDate: { type: Date, comment: "Start Date, p_date, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };