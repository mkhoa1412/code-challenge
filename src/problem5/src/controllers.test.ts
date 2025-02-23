import { describe, expect, it, jest } from "@jest/globals";
import { Request, Response } from "express";
import {
  createResource,
  deleteResource,
  getResource,
  listResources,
  updateResource,
} from "./controllers";

describe("createResource", () => {
  describe("Successfully create resource with valid name and description", () => {
    it("should create resource and return 201 when valid name and description provided", async () => {
      const mockRun = jest.fn().mockResolvedValue({ lastID: 1 } as never);
      const mockDB = { run: mockRun };
      jest.spyOn(require("./database"), "connectDB").mockResolvedValue(mockDB);

      const req = {
        body: {
          name: "Test Resource",
          description: "Test Description",
        },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await createResource(req, res);

      expect(mockRun).toHaveBeenCalledWith(
        "INSERT INTO resources (name, description) VALUES (?, ?)",
        ["Test Resource", "Test Description"]
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        name: "Test Resource",
        description: "Test Description",
      });
    });
  });

  describe("Reject request when name field is missing", () => {
    it("should return 400 error when name is missing", async () => {
      const req = {
        body: {
          description: "Test Description",
        },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await createResource(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Name is required",
      });
    });
  });
});

describe("listResources", () => {
  describe("Returns all resources when no query parameters are provided", () => {
    it("should return all resources when no filters are provided", async () => {
      const mockDB = {
        all: jest.fn().mockResolvedValue([
          { id: 1, name: "Resource 1", description: "Desc 1" },
          { id: 2, name: "Resource 2", description: "Desc 2" },
        ] as never),
      };

      jest.spyOn(require("./database"), "connectDB").mockResolvedValue(mockDB);

      const req = {
        query: {},
      } as Request;

      const res = {
        json: jest.fn(),
      } as unknown as Response;

      await listResources(req, res);

      expect(mockDB.all).toHaveBeenCalledWith(
        "SELECT * FROM resources WHERE 1=1",
        []
      );
      expect(res.json).toHaveBeenCalledWith([
        { id: 1, name: "Resource 1", description: "Desc 1" },
        { id: 2, name: "Resource 2", description: "Desc 2" },
      ]);
    });
  });

  describe("Handles special characters in name/description query parameters", () => {
    it("should escape special characters in name and description filters", async () => {
      const mockDB = {
        all: jest.fn().mockResolvedValue([] as never),
      };

      jest.spyOn(require("./database"), "connectDB").mockResolvedValue(mockDB);

      const req = {
        query: {
          name: "test'%_",
          description: "desc'%_",
        },
      } as unknown as Request;

      const res = {
        json: jest.fn(),
      } as unknown as Response;

      await listResources(req, res);

      expect(mockDB.all).toHaveBeenCalledWith(
        "SELECT * FROM resources WHERE 1=1 AND name LIKE ? AND description LIKE ?",
        ["%test'%_%", "%desc'%_%"]
      );
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });
});

describe("getResource", () => {
  describe("Returns resource object and 200 status when resource exists", () => {
    it("should return resource and 200 status when resource exists", async () => {
      const mockResource = { id: 1, name: "test" };
      const mockDb = {
        get: jest.fn().mockResolvedValue(mockResource as never),
      };
      const mockReq = {
        params: { id: 1 },
      };
      const mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      jest.spyOn(require("./database"), "connectDB").mockResolvedValue(mockDb);

      await getResource(
        mockReq as unknown as Request,
        mockRes as unknown as Response
      );

      expect(mockDb.get).toHaveBeenCalledWith(
        "SELECT * FROM resources WHERE id = ?",
        [1]
      );
      expect(mockRes.json).toHaveBeenCalledWith(mockResource);
    });
  });

  describe("Returns 404 status when resource id doesn't exist", () => {
    it("should return 404 when resource not found", async () => {
      const mockDb = {
        get: jest.fn().mockResolvedValue(null as never),
      };
      const mockReq = {
        params: { id: 999 },
      };
      const mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      jest.spyOn(require("./database"), "connectDB").mockResolvedValue(mockDb);

      await getResource(
        mockReq as unknown as Request,
        mockRes as unknown as Response
      );

      expect(mockDb.get).toHaveBeenCalledWith(
        "SELECT * FROM resources WHERE id = ?",
        [999]
      );
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Resource not found",
      });
    });
  });
});

describe("updateResource", () => {
  describe("Successfully update resource with valid name and description", () => {
    it("should update resource and return updated data when valid id provided", async () => {
      const mockRun = jest.fn().mockResolvedValue({ changes: 1 } as never);
      const mockDB = { run: mockRun };
      jest.spyOn(require("./database"), "connectDB").mockResolvedValue(mockDB);

      const req = {
        body: { name: "New Name", description: "New Description" },
        params: { id: "123" },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await updateResource(
        req as unknown as Request,
        res as unknown as Response
      );

      expect(mockRun).toHaveBeenCalledWith(
        "UPDATE resources SET name = ?, description = ? WHERE id = ?",
        ["New Name", "New Description", "123"]
      );
      expect(res.json).toHaveBeenCalledWith({
        id: "123",
        name: "New Name",
        description: "New Description",
      });
    });
  });

  describe("Handle case when resource ID does not exist", () => {
    it("should return 404 when resource id not found", async () => {
      const mockRun = jest.fn().mockResolvedValue({ changes: 0 } as never);
      const mockDB = { run: mockRun };
      jest.spyOn(require("./database"), "connectDB").mockResolvedValue(mockDB);

      const req = {
        body: { name: "New Name", description: "New Description" },
        params: { id: "invalid-id" },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await updateResource(
        req as unknown as Request,
        res as unknown as Response
      );

      expect(mockRun).toHaveBeenCalledWith(
        "UPDATE resources SET name = ?, description = ? WHERE id = ?",
        ["New Name", "New Description", "invalid-id"]
      );
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Resource not found" });
    });
  });
});

describe("deleteResource", () => {
  describe("Successfully delete existing resource and return success message", () => {
    it("should return success message when deleting existing resource", async () => {
      const mockRun = jest.fn().mockResolvedValue({ changes: 1 } as never);
      const mockDB = { run: mockRun };
      jest.spyOn(require("./database"), "connectDB").mockResolvedValue(mockDB);

      const mockReq = {
        params: { id: "123" },
      } as unknown as Request;

      const mockRes = {
        json: jest.fn(),
      } as unknown as Response;

      await deleteResource(mockReq, mockRes);

      expect(mockRun).toHaveBeenCalledWith(
        "DELETE FROM resources WHERE id = ?",
        ["123"]
      );
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Resource deleted",
      });
    });
  });

  describe("Attempt to delete non-existent resource returns 404", () => {
    it("should return 404 when resource does not exist", async () => {
      const mockRun = jest.fn().mockResolvedValue({ changes: 0 } as never);
      const mockDB = { run: mockRun };
      jest.spyOn(require("./database"), "connectDB").mockResolvedValue(mockDB);

      const mockReq = {
        params: { id: "999" },
      } as unknown as Request;

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await deleteResource(mockReq, mockRes);

      expect(mockRun).toHaveBeenCalledWith(
        "DELETE FROM resources WHERE id = ?",
        ["999"]
      );
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Resource not found",
      });
    });
  });
});
