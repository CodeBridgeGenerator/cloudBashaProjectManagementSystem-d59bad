
    module.exports = function (app) {
        const modelName = "tasks";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            taskNo: { type:  String , comment: "Task No, p, false, true, true, true, true, true, true, , , , ," },
projectName: { type: [Schema.Types.ObjectId], ref: "projects", description: "isArray", comment: "Project Name, dropdown, false, true, true, true, true, true, true, projects, projects, one-to-one, projectName," },
taskName: { type:  String , comment: "Task Name, p, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , comment: "Description, p, false, true, true, true, true, true, true, , , , ," },
assignedTo: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Assigned To, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
priority: { type:  String , comment: "Priority, p, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
startDate: { type: Date, comment: "Start Date, p_date, false, true, true, true, true, true, true, , , , ," },
dueDate: { type: Date, comment: "Due Date, p_date, false, true, true, true, true, true, true, , , , ," },
estimatedHours: { type: Number, comment: "Estimated Hours, p_number, false, true, true, true, true, true, true, , , , ," },
actualHours: { type: Number, comment: "Actual Hours, p_number, false, true, true, true, true, true, true, , , , ," },
progress: { type: Number, comment: "Progress, p_number, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };