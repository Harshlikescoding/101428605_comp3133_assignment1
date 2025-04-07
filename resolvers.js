const Employee = require("./models/EmployeeModel");
const User = require("./models/UserModel");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "COMP3133_SECRET"; // You can move this to .env

exports.resolvers = {
  Query: {
    getEmployees: async () => {
      return await Employee.find({});
    },

    getEmployeeByID: async (parent, args) => {
      return await Employee.findById(args.id);
    },

    login: async (parent, args) => {
      try {
        const userData = await User.findOne({ username: args.username });

        if (!userData || args.password !== userData.password) {
          return {
            status: false,
            message: "Invalid username or password",
          };
        }

        const token = jwt.sign(
          { id: userData._id, username: userData.username },
          SECRET_KEY,
          { expiresIn: "1h" }
        );

        return {
          status: true,
          message: `User (username: ${userData.username}) logged in successfully`,
          token: token,
          user: userData,
        };
      } catch (error) {
        return {
          status: false,
          message: "Something went wrong while logging in",
          error: error.message,
        };
      }
    },
  },

  Mutation: {
    signup: async (parent, args) => {
      try {
        const newUser = new User({
          username: args.username,
          email: args.email,
          password: args.password,
        });

        const user = await newUser.save();

        const token = jwt.sign(
          { id: user._id, username: user.username },
          SECRET_KEY,
          { expiresIn: "1h" }
        );

        return {
          status: true,
          message: "User successfully created",
          token: token,
          user: user,
        };
      } catch (error) {
        if (error.code === 11000) {
          return {
            status: false,
            message: "Username or email already exists",
          };
        }
        return {
          status: false,
          message: "Something went wrong while creating user",
          error: error.message,
        };
      }
    },

    addEmployee: async (parent, args) => {
      try {
        const newEmp = new Employee({
          first_name: args.first_name,
          last_name: args.last_name,
          email: args.email,
          gender: args.gender,
          salary: args.salary,
          department: args.department, // ✅ added
        });

        const emp = await newEmp.save();
        return {
          message: "Employee successfully created",
          status: true,
          employee: emp,
        };
      } catch (error) {
        if (error.code === 11000) {
          return {
            message: "Employee already exists with the same email",
            status: false,
          };
        }
        return {
          message: "Something went wrong while creating employee",
          status: false,
          error: error.message,
        };
      }
    },

    updateEmployee: async (parent, args) => {
      if (!args.id) {
        return {
          message: "Please enter employee ID to update",
          status: false,
        };
      }

      try {
        const updatedEmployee = await Employee.findOneAndUpdate(
          { _id: args.id },
          {
            $set: {
              first_name: args.first_name,
              last_name: args.last_name,
              email: args.email,
              gender: args.gender,
              salary: args.salary,
              department: args.department, // ✅ added
            },
          },
          { new: true }
        );

        if (!updatedEmployee) {
          return {
            message: "No employee found",
            status: false,
          };
        }

        return {
          message: `${args.id} updated successfully`,
          status: true,
          employee: updatedEmployee,
        };
      } catch (error) {
        return {
          message: "Something went wrong while updating employee",
          status: false,
          error: error.message,
        };
      }
    },

    deleteEmployee: async (parent, args) => {
      if (!args.id) {
        return {
          message: "Please enter employee ID to delete",
          status: false,
        };
      }

      try {
        const employee = await Employee.findByIdAndDelete(args.id);

        if (!employee) {
          return {
            status: false,
            message: "No employee found",
          };
        }

        return {
          status: true,
          message: `${args.id} deleted successfully`,
        };
      } catch (error) {
        return {
          message: "Something went wrong while deleting employee",
          status: false,
          error: error.message,
        };
      }
    },
  },
};
