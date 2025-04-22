import nats, { Stan } from 'node-nats-streaming';
//TODO is it worth it to extract natsWrapper in common module if we will use it somewhere else (socket-server??)
class NatsWrapper {
  private _client?: Stan;

  get client() {
    if(!this._client) {
      throw new Error('Cannot access NATS client before connecting!');
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string ) {
    //clusterId same clusterId as in the nats-depl.yaml - assigned it of the cluster
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });

      this.client.on('error', (error) => {
        reject(error);
      })
    });
  }
}

export const natsWrapper = new NatsWrapper();