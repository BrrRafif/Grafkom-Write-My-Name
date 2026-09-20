function main()
{
  var canvas = document.getElementById("myCanvas");
  var gl = canvas.getContext("webgl");

  var vertices = [
    // B
    -0.85,  0.6,   -0.73,  0.6,   -0.85, -0.6,
    -0.85, -0.6,   -0.73,  0.6,   -0.73, -0.6,

    -0.85,  0.6,   -0.35,  0.6,   -0.85,  0.48,
    -0.85,  0.48,  -0.35,  0.6,   -0.35,  0.48,

    -0.85,  0.06,  -0.35,  0.06,  -0.85, -0.08,
    -0.85, -0.08,  -0.35,  0.06,  -0.35, -0.08,

    -0.85, -0.48,  -0.35, -0.48,  -0.85, -0.6,
    -0.85, -0.6,   -0.35, -0.48,  -0.35, -0.6,

    // Perut Atas
    -0.35,  0.6,   -0.23,  0.36,  -0.35,  0.36,

    -0.35,  0.36,  -0.23,  0.36,  -0.35,  0.06,
    -0.23,  0.36,  -0.23,  0.06,  -0.35,  0.06,

    -0.23,  0.06,  -0.35,  -0.06, -0.35,  0.06,

    // Perut Bawah
    -0.35,  -0.6,   -0.23, -0.36,  -0.35,  -0.36,

    -0.35,  -0.36,  -0.23, -0.36,  -0.35, -0.06,
    -0.23,  -0.36,  -0.23, -0.06,  -0.35, -0.06,

    -0.23,  -0.06,  -0.35,  -0.06, -0.35,  0.06,

    // R
     0.25,  0.6,    0.37,  0.6,    0.25, -0.6,
     0.25, -0.6,    0.37,  0.6,    0.37, -0.6,

     0.25,  0.6,    0.75,   0.6,   0.25,  0.48,
     0.25,  0.48,   0.75,  0.6,   0.75,  0.48,

     0.25,  0.06,   0.75,  0.06,   0.25, -0.06,
     0.25, -0.06,   0.75,  0.06,   0.75, -0.06,

     0.75,  0.6,   0.87,  0.36,   0.75,  0.36,
     0.75,  0.36,   0.87,  0.36,   0.75,  0.06,
     0.87,  0.36,   0.87,  0.06,   0.75,  0.06,
     0.87,  0.06,   0.75, -0.06,   0.75,  0.06,

     0.45, -0.06,   0.6, -0.06,   0.75, -0.6,
     0.75, -0.6,    0.9, -0.6,    0.6, -0.06
  ];

  const vertexShaderCode = `
    attribute vec2 aPosition;
    void main() 
    {
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }`;

  const fragmentShaderCode = `
    precision mediump float;
    void main()
    {
      gl_FragColor = vec4(0.0, 0.6, 0.9, 1.0);
    }`;

  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) 
  {
    console.error("Vertex shader error:", gl.getShaderInfoLog(vertexShader));
  }

  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) 
  {
    console.error("Fragment shader error:", gl.getShaderInfoLog(fragmentShader));
  }

  // program harus dibuat DULU sebelum getAttribLocation
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  var aPosition = gl.getAttribLocation(program, "aPosition");
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
}