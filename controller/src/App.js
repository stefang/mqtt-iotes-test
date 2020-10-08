import React, { useState, useEffect } from 'react';
import './App.css';
import { createDeviceDispatchable, createHostDispatchable } from '@iotes/core';
import { createIotes } from '@iotes/react-hooks';
import { mqttStrategy } from '@iotes/strategy-mqtt';

const topology = {
    client: {
        name: 'exoplanet-control'
    },
    hosts: [{
        host: 'ws://test.mosquitto.org',
        port: '8080',
        name: 'exoplanet'
    }],
    devices: [{
        hostName: 'exoplanet',
        type: 'EXTERNAL_CHANNEL',
        name: 'wtc/exoplanet/textures'
    }],
}

const { useIotesDevice, useIotesHost } = createIotes({ topology: topology, strategy: mqttStrategy })

const App = () => {
    const [deviceSubscribe, deviceDispatch] = useIotesDevice()

    const handleDataFrame = () => {
        var date = new Date();

        var options = {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        };

        deviceDispatch(
            createDeviceDispatchable('wtc/exoplanet/textures', 'UPDATE', {
                texture: "test-" + date.toLocaleDateString("en", options)
            })
        )
    }

    useEffect(() => {
        // setInterval(
        //     () => handleDataFrame()
        //     , 2000)
    }, [])

    return (
        <>
            <button onClick={handleDataFrame}>Send Test Message</button>
            <p>Device Subscribe: {JSON.stringify(deviceSubscribe)}</p>
        </>
    );
}
              
export default App;
