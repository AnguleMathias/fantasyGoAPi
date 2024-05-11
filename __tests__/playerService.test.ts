import axios from "axios";
import { fetchPlayers } from "../src/services/playerService";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Player Service", () => {
  const mockResponse = {
    data: {
      elements: [
        {
          first_name: "John",
          second_name: "Doe",
          web_name: "JD",
          total_points: 100,
          team_name: "Dream FC",
          statistic1: "10 goals",
          statistic2: "5 assists",
        },
      ],
    },
  };

  test("should fetch players for a given league", async () => {
    mockedAxios.get.mockResolvedValue(mockResponse);

    const players = await fetchPlayers("EPL");
    expect(players).toBeInstanceOf(Array);
    expect(players.length).toBeGreaterThan(0);
    expect(players[0].firstName).toBe("John");
  });
});
