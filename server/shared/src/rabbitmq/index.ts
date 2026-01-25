import { connect as amqpConnect, Options } from "amqplib";
import { getLogger } from "../logger";

type ConnectOptions = {
  url: string;
};

let connection: any | null = null;
let channel: any | null = null;

export const connect = async ({ url }: ConnectOptions) => {
  if (connection) return connection;
  const logger = getLogger();
  connection = await amqpConnect(url);
  channel = await connection.createChannel();
  connection.on("close", () => {
    logger.warn("RabbitMQ connection closed");
    connection = null;
    channel = null;
  });
  connection.on("error", (err: unknown) => {
    logger.error({ err }, "RabbitMQ connection error");
  });
  logger.info("RabbitMQ connected");
  return connection;
};

export const getChannel = async () => {
  if (!channel) throw new Error("RabbitMQ channel is not initialized. Call connect() first.");
  return channel;
};

export const assertExchange = async (name: string, type: "topic" | "direct" | "fanout" | "headers" = "topic", options?: Options.AssertExchange) => {
  const ch = await getChannel();
  await ch.assertExchange(name, type, { durable: true, ...(options || {}) });
};

export const assertQueue = async (name: string, options?: Options.AssertQueue) => {
  const ch = await getChannel();
  await ch.assertQueue(name, { durable: true, ...(options || {}) });
};

export const bindQueue = async (queue: string, exchange: string, routingKey = "#") => {
  const ch = await getChannel();
  await ch.bindQueue(queue, exchange, routingKey);
};

export const publish = async (exchange: string, routingKey: string, message: unknown, options?: Options.Publish) => {
  const ch = await getChannel();
  const payload = Buffer.from(JSON.stringify({ data: message, timestamp: Date.now() }));
  ch.publish(exchange, routingKey, payload, { persistent: true, contentType: "application/json", ...(options || {}) });
};

export const consume = async (queue: string, handler: (msg: { data: any; timestamp?: number }) => Promise<void> | void, options?: Options.Consume) => {
  const ch = await getChannel();
  await ch.consume(queue, async (msg: any) => {
    if (!msg) return;
    try {
      const json = JSON.parse(msg.content.toString());
      await handler(json);
      ch.ack(msg);
    } catch (err) {
      getLogger().error({ err }, "RabbitMQ message handling error");
      ch.nack(msg, false, false);
    }
  }, options);
};

export const close = async () => {
  if (channel) {
    await channel.close();
    channel = null;
  }
  if (connection) {
    await connection.close();
    connection = null;
  }
};