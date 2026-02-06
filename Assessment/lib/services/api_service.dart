import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ApiService {
  final Dio _dio = Dio(BaseOptions(baseUrl: 'http://10.0.2.2:5000/api'));
  final _storage = const FlutterSecureStorage();


  ApiService() {
    _dio.interceptors.add(InterceptorsWrapper(
      onError: (DioException e, handler) async {

        if (e.response?.statusCode == 401) {
          String? refreshToken = await _storage.read(key: 'refreshToken');

          if (refreshToken != null) {
            try {
              // 1. Naya Access Token mangwayein
              final refreshRes = await Dio().post(
                'http://10.0.2.2:5000/api/auth/refresh',
                data: {'refreshToken': refreshToken},
              );

              if (refreshRes.statusCode == 200) {
                String newAccessToken = refreshRes.data['accessToken'];

                await _storage.write(key: 'token', value: newAccessToken);


                e.requestOptions.headers['Authorization'] = 'Bearer $newAccessToken';
                final response = await _dio.fetch(e.requestOptions);
                return handler.resolve(response);
              }
            } catch (err) {
              print("Session expired, please login again.");
            }
          }
        }
        return handler.next(e);
      },
    ));
  }


  Future<Response> register(String email, String password) async {
    return await _dio.post('/auth/register', data: {'email': email, 'password': password});
  }


  Future<Response> login(String email, String password) async {
    final response = await _dio.post('/auth/login', data: {'email': email, 'password': password});
    // Dono tokens save karna zaroori hai
    await _storage.write(key: 'token', value: response.data['accessToken']);
    await _storage.write(key: 'refreshToken', value: response.data['refreshToken']);
    return response;
  }


  Future<Response> getTasks({String? status, String? search}) async {
    String? token = await _storage.read(key: 'token');
    return await _dio.get(
      '/tasks',
      queryParameters: {
        if (status != null) 'status': status,
        if (search != null) 'search': search,
      },
      options: Options(headers: {'Authorization': 'Bearer $token'}),
    );
  }


  Future<Response> addTask(String title, String description) async {
    String? token = await _storage.read(key: 'token');
    return await _dio.post(
      '/tasks',
      data: {'title': title, 'description': description},
      options: Options(headers: {'Authorization': 'Bearer $token'}),
    );
  }


  Future<Response> toggleTaskStatus(int id, String currentStatus) async {
    String? token = await _storage.read(key: 'token');
    String newStatus = (currentStatus == 'pending') ? 'completed' : 'pending';
    return await _dio.patch(
      '/tasks/$id',
      data: {'status': newStatus},
      options: Options(headers: {'Authorization': 'Bearer $token'}),
    );
  }


  Future<Response> deleteTask(int id) async {
    String? token = await _storage.read(key: 'token');
    return await _dio.delete(
      '/tasks/$id',
      options: Options(headers: {'Authorization': 'Bearer $token'}),
    );
  }
}