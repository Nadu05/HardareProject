#include <Arduino.h>
#include <Servo.h>

Servo myServo; // Create a servo object

const int servoPin = 9; // Define the pin connected to the servo

void setup()
{
    myServo.attach(servoPin); // Attach the servo to the defined pin
    Serial.begin(9600);
    myServo.attach(servoPin); // Attach the servo to the defined pin
}



void loop()
{ char incomingByte = Serial.read(); // Read the incoming byte

    if (incomingByte == 'a')
    {
        myServo.write(0); // Rotate the servo to 0 degrees
    }
    else if (incomingByte == 'b')
    {
        myServo.write(90); // Rotate the servo to 90 degrees
    }
    else if (incomingByte == 'c')
    {
        myServo.write(180); // Rotate the servo to 180 degrees
    }


    delay(500); // Wait at 0 degrees
}
