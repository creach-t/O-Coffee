jest.mock("./database", () => ({
  query: jest.fn(),
}));

const dataMapper = require("./dataMapper");
const database = require("./database");

describe("dataMapper", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Réinitialiser les mocks après chaque test
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

    it("should return an empty array if no coffees are found", async () => {
      database.query.mockResolvedValueOnce({ rows: [] });

      const result = await dataMapper.getAllCoffees();

      expect(database.query).toHaveBeenCalledWith(
        "SELECT * FROM cafes ORDER BY reference ASC"
      );
      expect(result).toEqual([]);
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

    it("should return an empty array if no coffees are found", async () => {
      database.query.mockResolvedValueOnce({ rows: [] });
      const result = await dataMapper.get3NewsCoffees();
      expect(database.query).toHaveBeenCalledWith(
        "SELECT * FROM cafes ORDER BY date_ajout DESC LIMIT 3"
      );
      expect(result).toEqual([]);
    });
  });

  describe("getCoffeeByReference", () => {
    it("should fetch a coffee by reference", async () => {
      const mockRow = { id: 1, reference: "ABC123" };
      database.query.mockResolvedValueOnce({ rows: [mockRow] });
      const result = await dataMapper.getCoffeeByReference("ABC123");
      expect(database.query).toHaveBeenCalledWith({
        text: "SELECT * FROM cafes WHERE reference = $1",
        values: ["ABC123"],
      });
      expect(result).toEqual(mockRow);
    });

    it("should return undefined if no coffee is found", async () => {
      database.query.mockResolvedValueOnce({ rows: [] });
      const result = await dataMapper.getCoffeeByReference("UNKNOWN");
      expect(database.query).toHaveBeenCalledWith({
        text: "SELECT * FROM cafes WHERE reference = $1",
        values: ["UNKNOWN"],
      });
      expect(result).toBeUndefined();
    });
  });

  describe("getCoffeeByCategories", () => {
    it("should fetch coffees by category", async () => {
      const mockRows = [{ id: 1, category: "Arabica" }];
      database.query.mockResolvedValueOnce({ rows: mockRows });
      const result = await dataMapper.getCoffeeByCategories("Arabica");
      expect(database.query).toHaveBeenCalledWith({
        text: "SELECT * FROM cafes WHERE caracteristique_principale = $1",
        values: ["Arabica"],
      });
      expect(result).toEqual(mockRows);
    });

    it("should return an empty array if no coffees are found", async () => {
      database.query.mockResolvedValueOnce({ rows: [] });

      const result = await dataMapper.getCoffeeByCategories("UnknownCategory");

      expect(database.query).toHaveBeenCalledWith({
        text: "SELECT * FROM cafes WHERE caracteristique_principale = $1",
        values: ["UnknownCategory"],
      });
      expect(result).toEqual([]);
    });
  });

  describe("signUp", () => {
    it("should throw an error if email is not in a valid format", async () => {
      await expect(
        dataMapper.signUp("John", "Doe", "invalid-email", "password123")
      ).rejects.toThrow("Email invalide");
    });
    it("should throw an error if firstname is too long", async () => {
      const longFirstname = "a".repeat(51);
      await expect(
        dataMapper.signUp(
          longFirstname,
          "Doe",
          "test@example.com",
          "password123"
        )
      ).rejects.toThrow("Le prénom doit contenir entre 1 et 50 caractères");
    });
    it("should throw an error if firstname is empty", async () => {
      await expect(
        dataMapper.signUp("", "Doe", "test@example.com", "password123")
      ).rejects.toThrow("Le prénom doit contenir entre 1 et 50 caractères");
    });
    it("should throw an error if lastname is too long", async () => {
      const longLastname = "a".repeat(51);
      await expect(
        dataMapper.signUp(
          "John",
          longLastname,
          "test@example.com",
          "password123"
        )
      ).rejects.toThrow("Le nom doit contenir entre 1 et 50 caractères");
    });
    it("should throw an error if password is too short", async () => {
      await expect(
        dataMapper.signUp("John", "Doe", "test@example.com", "short")
      ).rejects.toThrow("Le mot de passe doit contenir au moins 8 caractères");
    });
    it("should throw an error if email already exists", async () => {
      jest.spyOn(dataMapper, "checkEmailExists").mockResolvedValueOnce(true);

      await expect(
        dataMapper.signUp("John", "Doe", "test@example.com", "password123")
      ).rejects.toThrow("Email déjà utilisé");

      expect(dataMapper.checkEmailExists).toHaveBeenCalledWith(
        "test@example.com"
      );
    });
    it("should insert a new user if email does not exist", async () => {
      jest.spyOn(dataMapper, "checkEmailExists").mockResolvedValueOnce(false);
      database.query.mockResolvedValueOnce({});
      await dataMapper.signUp("John", "Doe", "test@example.com", "password123");
      expect(dataMapper.checkEmailExists).toHaveBeenCalledWith(
        "test@example.com"
      );
      expect(database.query).toHaveBeenCalledWith(
        "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)",
        ["John", "Doe", "test@example.com", "password123"]
      );
    });
  });
});
