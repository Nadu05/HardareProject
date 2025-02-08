#include <Arduino.h>

const int LED_PIN = 2; // Built-in LED on most ESP32 boards

void setup()
{
  Serial.begin(115200); // Initialize serial communication
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
}

void loop()
{
  if (Serial.available() > 0)
  {
    char command = Serial.read();

    switch (command)
    {
    case '1': // Turn ON LED
      digitalWrite(LED_PIN, HIGH);
      Serial.println("LED_ON_OK");
      break;

    case '0': // Turn OFF LED
      digitalWrite(LED_PIN, LOW);
      Serial.println("LED_OFF_OK");
      break;

    default:
      Serial.println("INVALID_COMMAND");
      break;
    }
  }
}