var global_config = 
{
      "time_duration": 30,
      "test_type": "standby",
      "noise_level": 0,
      "spectrum_display": false,
      "data_types_num": 3,
      "dynamic_scale": 2,
      "value_mode":false,
      "radius": 1,
      "current_test":"no-test",
      "theta": 2.09439510239,
      "unit_based_sample_play":true,
      "test_mode": "test_mode",
      "encoding_method":"TIME-PAN-(PERC-SEQ)",
      "audio_config": {
        "voice_over": false,
        "audience_location": {
          "pitch": 0,
          "yaw": 0,
          "roll": 0
        },
        "mode": "percnpan",
        "dataset": "default",
        "voice_over_time": 1,
        "pitchnpan_interval": 1,
        "reference_timeline": false,
        "switch_real_samples": false,
        "audio_channels": [
          {
            "synth_index": 0,
            "mute": false,
            "synth": {
              "oscillator": {
                "type": "square"
              },
              "envelope": {
                "attack": 0,
                "decay": 0,
                "sustain": 0.01,
                "release": 0.1
              }
            },
            "tremolo_effect": {
              "frequency": 0,
              "depth": 0
            }
          },
          {
            "synth_index": 1,
            "mute": false,
            "synth": {
              "oscillator": {
                "type": "sawtooth"
              },
              "envelope": {
                "attack": 0,
                "decay": 0,
                "sustain": 0.01,
                "release": 0.1
              }
            },
            "tremolo_effect": {
              "frequency": 0,
              "depth": 0
            }
          },
          {
            "synth_index": 2,
            "mute": false,
            "synth": {
              "oscillator": {
                "type": "sine"
              },
              "envelope": {
                "attack": 0,
                "decay": 0,
                "sustain": 0.01,
                "release": 0.1
              }
            },
            "tremolo_effect": {
              "frequency": 0,
              "depth": 0
            }
          }
        ]
      }
    };

    var update_global_config = [];
    var simple_update_test_data_selection = [];
    var play_function = [];
    var stop_function = [];