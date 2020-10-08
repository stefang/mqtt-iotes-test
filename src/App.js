import React from 'react';
import './App.css';
import { createDeviceDispatchable, createHostDispatchable } from '@iotes/core';
import { createIotes } from '@iotes/react-hooks';
import { mqttStrategy } from '@iotes/strategy-mqtt';

const topology = {
  client: {
    name: 'client_id_'+Math.round(Math.random()*1000)
  },
  hosts: [{
    host: 'ws://test.mosquitto.org',
    port: '8080',
    name: 'test-interapp'
  }],
  devices: [{
    hostName: 'test-interapp',
    type: 'EXTERNAL_CHANNEL',
    name: 'wtcxqq/testapp'
  }],
}

const { useIotesDevice, useIotesHost } = createIotes({ topology: topology, strategy: mqttStrategy })

const App = () => {
  const [deviceSubscribe, deviceDispatch] = useIotesDevice()
  const [hostSubscribe, hostDispatch] = useIotesHost()

  const sendHostDispatch = () => {
    var date = new Date();

    var options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    };

    hostDispatch(
      createHostDispatchable('wtcxqq/testapp', 'UPDATE', {
        testdata: "host-test-" + date.toLocaleDateString("en", options)
      })
    )
  }

  const sendDeviceDispatch = () => {
    var date = new Date();

    var options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    };

    deviceDispatch(
      createDeviceDispatchable('wtcxqq/testapp', 'UPDATE', {
        testdata: "device-test-" + date.toLocaleDateString("en", options)
      })
    )
  }

  return (
    <>
      <p>Client ID {topology.client.name}</p>
      <p>
        <button onClick={sendHostDispatch}>Test Host Dispatch</button>
        <button onClick={sendDeviceDispatch}>Test Device Dispatch</button>
      </p>
      <p>Host Subscribe:</p>
      <pre>{JSON.stringify(hostSubscribe, null, 2)}</pre>
      <p>Device Subscribe:</p>
      <pre>{JSON.stringify(deviceSubscribe, null, 2)}</pre>
    </>
  );
}

export default App;
