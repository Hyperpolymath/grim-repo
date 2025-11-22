{
  description = "GrimRepo Scripts - Modular audit-grade tooling for narratable repositories";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        # Node.js environment
        nodejs = pkgs.nodejs_20;

        # Just task runner
        just = pkgs.just;

      in
      {
        # Development shell
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs
            just
            git
            nodePackages.typescript
            nodePackages.typescript-language-server
            nodePackages.eslint
            nodePackages.prettier
          ];

          shellHook = ''
            echo "🔧 GrimRepo Development Environment"
            echo ""
            echo "Node.js: $(node --version)"
            echo "npm: $(npm --version)"
            echo "just: $(just --version)"
            echo ""
            echo "Available commands:"
            echo "  just --list    Show all available tasks"
            echo "  npm install    Install dependencies"
            echo "  npm test       Run tests"
            echo "  npm run build  Build project"
            echo ""

            # Install npm dependencies if not already installed
            if [ ! -d "node_modules" ]; then
              echo "📦 Installing npm dependencies..."
              npm install
            fi
          '';
        };

        # Package definition
        packages.default = pkgs.buildNpmPackage {
          pname = "grimrepo-scripts";
          version = "1.0.0";

          src = ./.;

          npmDepsHash = "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";

          buildPhase = ''
            npm run build
          '';

          checkPhase = ''
            npm run validate
          '';

          installPhase = ''
            mkdir -p $out
            cp -r dist $out/
            cp package.json $out/
            cp README.md $out/
            cp LICENSE.txt $out/
          '';

          meta = with pkgs.lib; {
            description = "Modular audit-grade tooling for narratable repositories";
            homepage = "https://grimrepo.dev";
            license = [ licenses.mit ]; # Dual MIT + Palimpsest
            maintainers = [ ];
          };
        };

        # Apps
        apps.default = {
          type = "app";
          program = "${self.packages.${system}.default}/dist/index.js";
        };

        # Checks
        checks = {
          build = self.packages.${system}.default;

          tests = pkgs.runCommand "grimrepo-tests" {
            buildInputs = [ nodejs ];
          } ''
            cd ${self}
            npm install
            npm test
            touch $out
          '';
        };
      }
    );
}
