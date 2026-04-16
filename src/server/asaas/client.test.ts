jest.mock("~/env", () => ({
  env: {
    ASAAS_API_KEY: "test_key",
    ASAAS_API_URL: "https://sandbox.asaas.com/api/v3",
  },
}));
jest.mock("server-only", () => ({}));

describe("asaasFetch", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("retorna payload JSON quando a resposta é ok", async () => {
    const { asaasFetch } = await import("./client");
    const fetchMock = jest
      .spyOn(global, "fetch")
      .mockResolvedValue(
        new Response(JSON.stringify({ id: "pay_1" }), { status: 200 }),
      );

    await expect(asaasFetch<{ id: string }>("/payments")).resolves.toEqual({
      id: "pay_1",
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("normaliza erro da API usando descrição em errors[0]", async () => {
    const { asaasFetch } = await import("./client");
    jest.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          errors: [{ code: "invalid_field", description: "CPF inválido" }],
        }),
        { status: 400, statusText: "Bad Request" },
      ),
    );

    await expect(asaasFetch("/payments")).rejects.toMatchObject({
      name: "AsaasApiError",
      status: 400,
      message: "CPF inválido",
    });
  });

  it("retorna erro controlado quando Asaas responde texto inválido", async () => {
    const { asaasFetch } = await import("./client");
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response("gateway html", { status: 200 }));

    await expect(asaasFetch("/payments")).rejects.toMatchObject({
      name: "AsaasApiError",
      status: 502,
    });
  });

  it("retorna timeout padronizado quando fetch aborta", async () => {
    const { asaasFetch } = await import("./client");
    const abortError = new Error("aborted");
    abortError.name = "AbortError";
    jest.spyOn(global, "fetch").mockRejectedValue(abortError);

    await expect(asaasFetch("/payments")).rejects.toEqual(
      expect.objectContaining({
        name: "AsaasApiError",
        status: 504,
      }),
    );
  });
});
