FROM mcr.microsoft.com/dotnet/sdk:6.0
WORKDIR /app
COPY backend/app/csharp-dotnet-server-docker.csproj ./
RUN dotnet restore
COPY backend/app /app
RUN dotnet dev-certs https --clean && dotnet dev-certs https -t
