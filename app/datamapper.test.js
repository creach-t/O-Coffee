const dataMapper = require("./dataMapper");
const database = require("./database");

jest.mock("./database"); // Mock the database module

describe("dataMapper", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  describe("getAllCoffees", () => {
    it("should fetch all coffees ordered by reference", async () => {
      const mockRows = [
        { id: 1, reference: "ABC123" },
        { id: 2, reference: "XYZ456" },
      ];
      database.query.mockResolvedValueOnce({ rows: mockRows });

      const result = await dataMapper.getAllCoffees();

      expect(database.query).toHaveBeenCalledTimes(1);
      expect(database.query).toHaveBeenCalledWith(
        "SELECT * FROM cafes ORDER BY reference ASC"
      );
      expect(result).toEqual(mockRows);
    });

    it("should throw an error if the database query fails", async () => {
      database.query.mockRejectedValueOnce(new Error("Database error"));

      await expect(dataMapper.getAllCoffees()).rejects.toThrow(
        "Unable to retrieve coffees."
      );
    });
  });

  describe("get3NewsCoffees", () => {
    it("should fetch 3 newest coffees", async () => {
      const mockRows = [{ id: 1, date_ajout: "2024-11-01" }];
      database.query.mockResolvedValueOnce({ rows: mockRows });

      const result = await dataMapper.get3NewsCoffees();

      expect(database.query).toHaveBeenCalledWith(
        "SELECT * FROM cafes ORDER BY date_ajout DESC LIMIT 3"
      );
      expect(result).toEqual(mockRows);
    });

    it("should throw an error if the database query fails", async () => {
      database.query.mockRejectedValueOnce(new Error("Database error"));

      await expect(dataMapper.get3NewsCoffees()).rejects.toThrow(
        "Unable to retrieve the latest 3 coffees."
      );
    });
  });

  describe("getCoffeeByReference", () => {
    it("should fetch a coffee by reference", async () => {
      const mockRow = { id: 1, reference: "ABC123" };
      database.query.mockResolvedValueOnce({ rows: [mockRow] });

      const result = await dataMapper.getCoffeeByReference("ABC123");

      expect(database.query).toHaveBeenCalledWith({
        text: `
              SELECT 
                  cafes.*, 
                  pays.nom_pays AS origin, 
                  pays.code_pays, 
                  pays.continent, 
                  pays.langue_officielle, 
                  pays.monnaie 
              FROM cafes
              JOIN pays ON cafes.pays_id = pays.id
              WHERE cafes.reference = $1
          `,
        values: ["ABC123"],
      });
      expect(result).toEqual(mockRow);
    });

    it("should throw an error if the database query fails", async () => {
      database.query.mockRejectedValueOnce(new Error("Database error"));

      await expect(dataMapper.getCoffeeByReference("ABC123")).rejects.toThrow(
        "Unable to retrieve the specified coffee."
      );
    });
  });

  describe("checkEmailExists", () => {
    it("should return true if the email exists", async () => {
      database.query.mockResolvedValueOnce({ rows: [{ count: "1" }] });

      const result = await dataMapper.checkEmailExists("test@example.com");

      expect(database.query).toHaveBeenCalledWith(
        "SELECT COUNT(*) FROM users WHERE email = $1",
        ["test@example.com"]
      );
      expect(result).toBe(true);
    });

    it("should return false if the email does not exist", async () => {
      database.query.mockResolvedValueOnce({ rows: [{ count: "0" }] });

      const result = await dataMapper.checkEmailExists("test@example.com");

      expect(database.query).toHaveBeenCalledWith(
        "SELECT COUNT(*) FROM users WHERE email = $1",
        ["test@example.com"]
      );
      expect(result).toBe(false);
    });

    it("should throw an error if the database query fails", async () => {
      database.query.mockRejectedValueOnce(new Error("Database error"));

      await expect(
        dataMapper.checkEmailExists("test@example.com")
      ).rejects.toThrow("Unable to verify the email.");
    });
  });

  describe("signUp", () => {
    it("should insert a new user if no error occurs", async () => {
      database.query.mockResolvedValueOnce({});

      await dataMapper.signUp(
        "John",
        "Doe",
        "test@example.com",
        "hashedPassword"
      );

      expect(database.query).toHaveBeenCalledWith(
        "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)",
        ["John", "Doe", "test@example.com", "hashedPassword"]
      );
    });

    it("should throw an error if the database query fails", async () => {
      database.query.mockRejectedValueOnce(new Error("Database error"));

      await expect(
        dataMapper.signUp("John", "Doe", "test@example.com", "hashedPassword")
      ).rejects.toThrow("Unable to create the user account.");
    });
  });

  describe("getUserByEmail", () => {
    it("should fetch a user by email", async () => {
      const mockRow = { id: 1, email: "test@example.com" };
      database.query.mockResolvedValueOnce({ rows: [mockRow] });

      const result = await dataMapper.getUserByEmail("test@example.com");

      expect(database.query).toHaveBeenCalledWith({
        text: "SELECT * FROM users WHERE email = $1",
        values: ["test@example.com"],
      });
      expect(result).toEqual(mockRow);
    });

    it("should throw an error if the database query fails", async () => {
      database.query.mockRejectedValueOnce(new Error("Database error"));

      await expect(
        dataMapper.getUserByEmail("test@example.com")
      ).rejects.toThrow("Unable to retrieve the user.");
    });
  });
});
