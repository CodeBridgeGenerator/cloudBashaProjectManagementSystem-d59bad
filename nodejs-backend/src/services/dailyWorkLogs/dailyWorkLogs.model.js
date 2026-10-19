
    module.exports = function (app) {
        const modelName = "daily_work_logs";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            workDate: { type:  String , comment: "Work Date, p, false, true, true, true, true, true, true, , , , ," },
employee: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Employee, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
projectName: { type: Schema.Types.ObjectId, ref: "projects", comment: "Project Name, dropdown, false, true, true, true, true, true, true, projects, projects, one-to-one, projectName," },
taskName: { type: [Schema.Types.ObjectId], ref: "tasks", description: "isArray", comment: "Task Name, dropdown, false, true, true, true, true, true, true, tasks, tasks, one-to-one, taskName," },
hours: { type: Number, comment: "Hours, p_number, false, true, true, true, true, true, true, , , , ," },
workDone: { type:  String , comment: "Work Done, p, false, true, true, true, true, true, true, , , , ," },
blockers: { type:  String , comment: "Blockers, p, false, true, true, true, true, true, true, , , , ," },
nextPlan: { type:  String , comment: "Next Plan, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };