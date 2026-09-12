import { index_of } from "./fluid-common.wgsl";

struct DisplayConfig {
  output_size: vec2f,
  background_color: vec3f,
}

const DYE_SIZE = vec2u(512, 288);

@group(0) @binding(0)
var<uniform> config: DisplayConfig;

@group(0) @binding(1)
var<storage, read> dye: array<vec4f>;

fn sample_dye(p: vec2f) -> vec3f {
  let grid = clamp(
    p * vec2f(DYE_SIZE) - 0.5,
    vec2f(0),
    vec2f(DYE_SIZE) - 1.0
  );

  let cell = vec2i(floor(grid));
  let f = fract(grid);

  let bottom = mix(
    dye[index_of(cell, DYE_SIZE)].rgb,
    dye[index_of(cell + vec2i(1, 0), DYE_SIZE)].rgb,
    f.x
  );

  let top = mix(
    dye[index_of(cell + vec2i(0, 1), DYE_SIZE)].rgb,
    dye[index_of(cell + vec2i(1, 1), DYE_SIZE)].rgb,
    f.x
  );

  return mix(bottom, top, f.y);
}

@fragment
fn fragment_main(
  @builtin(position) position: vec4f
) -> @location(0) vec4f {
  var uv = position.xy / config.output_size;

  // Keep the existing orientation.
  uv.y = 1.0 - uv.y;

  let density = sample_dye(uv);

  // Keep the original fluid calculation.
  let color = 1.0 - exp(-density * 1.35);

  let vignette =
    0.68 +
    0.32 *
    pow(
      max(
        0.0,
        1.0 - dot(uv - 0.5, uv - 0.5) * 1.9
      ),
      1.5
    );

  // ------------------------------------------------------------
  // Detect theme from the background itself.
  //
  // Dark background starts around 0.043.
  // Light background starts around 0.965.
  // ------------------------------------------------------------
  let is_light_mode = config.background_color.r > 0.5;

  if (is_light_mode) {
    // ----------------------------------------------------------
    // LIGHT MODE
    //
    // Do NOT add the fluid directly to the light background.
    // That would clip the result toward white.
    //
    // Instead, use the dye as a blend mask so the actual
    // colorful fluid remains visible.
    // ----------------------------------------------------------

    // Make the fluid more vivid on a bright background.
    let vivid = pow(
      clamp(color, vec3f(0.0), vec3f(1.0)),
      vec3f(0.62)
    );

    // Slight saturation/contrast boost.
    let vivid_color = clamp(
      vec3f(
        vivid.r * 0.95,
        vivid.g * 0.78,
        vivid.b * 1.10
      ),
      vec3f(0.0),
      vec3f(1.0)
    );

    // Strong enough to remain visible in light mode.
    let strength = clamp(
      dot(vivid_color, vec3f(0.299, 0.587, 0.114)) * 1.35,
      0.0,
      0.82
    );

    let fluid_mask = strength * vignette;

    // Blend colorful fluid over the light background.
    let final_color = mix(
      config.background_color,
      vivid_color,
      fluid_mask
    );

    return vec4f(final_color, 1.0);
  }

  // ------------------------------------------------------------
  // DARK MODE
  //
  // Keep the existing appearance unchanged.
  // ------------------------------------------------------------

  return vec4f(
    (config.background_color + color) * vignette,
    1.0
  );
}